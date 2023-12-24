import { Button } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, ReactFlowProvider, Controls, Background, useReactFlow, Node, Edge, useNodesInitialized, MarkerType, useStore, useStoreApi } from "reactflow";
import { NodeNewButton, Card } from "./NodeNewButton";

export const Flow = (props: { nodes: HierarchyNode[], onAppendNodeClick?: (id: string) => void }) => {

    return (
        <ReactFlowProvider>
            <FlowInner nodes={props.nodes} onAppendNodeClick={props.onAppendNodeClick}></FlowInner>
        </ReactFlowProvider>
    )
}

const nodeTypes = {
    new : NodeNewButton,
    card: Card,
}

const FlowInner = (props: { nodes: HierarchyNode[], onAppendNodeClick?: (id: string) => void }) => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        // const nodes = createHierarchyNodeNewButton([ ...props.nodes ]);
        const { initNodes, initEdges } = createNodesAndEdges([ ...props.nodes ], props.onAppendNodeClick);

        setNodes(initNodes);
        setEdges(initEdges);

    }, [props.nodes]);

    const onNodeClick = (event: React.MouseEvent, node: Node) => {
        // console.log(node);
    }

    return (
        <ReactFlow 
        nodesDraggable={false} 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange} 
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}>
            {/* <AutoLayout/> */}
            <Controls />
            <Background />
        </ReactFlow>
    )
}

const createHierarchyNodeNewButton = (hierarchyNodes: HierarchyNode[]) => {

    const nodes =  [ ...hierarchyNodes ];
    const newHiNodes : HierarchyNode[] = [];

    const aa = (nodes: HierarchyNode[], appendTarget: HierarchyNode[]) => {

        for (const node of nodes) {

            const newNode : HierarchyNode = { ...node, children: [] };
            appendTarget.push(newNode);
            
            aa(node.children, newNode.children);

            newNode.children.push({
                data: "test",
                children: [],
                id: node.id + "_NEW",
                type: "new",
            })

        }
    }

    //再帰呼出し
    aa(nodes, newHiNodes);

    return newHiNodes;
}

//ノードツリーからReactFlow用にNode・Edge配列を作成するメソッド
const createNodesAndEdges = (hierarchyNodes: HierarchyNode[], onAppendNodeClick?: (id: string) => void): any => {

    const n: Node[] = [];
    const e: Edge[] = [];

    const topMargin = 100;
    const leftMargin = 32;
    const width = 150, height = 38;

    let global_x = 0;

    const parents : { [id: string]: Node | undefined } = {};

    const aa = (nodes: HierarchyNode[], parentNode?: Node) => {

        let a = 0;

        for (const node of nodes) {

            parents[node.id] = parentNode;

            const nNode: Node = {
                id: node.id,
                type: "card",
                data: { label: node.data, id: node.id, onAppendNodeClick: onAppendNodeClick },
                position: { x: global_x, y: 0 },
            };

            n.push(nNode);

            if (parentNode) {
                e.push({
                    id: crypto.randomUUID(),
                    source: parentNode.id,
                    target: nNode.id,
                    type: 'smoothstep',
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                    },
                })
            }

            if (parentNode) {
                nNode.position.x = global_x;
                nNode.position.y = parentNode.position.y + height + topMargin;
            }

            a += (width + leftMargin);

            aa(node.children, nNode);
        }

        let pnode : Node | undefined = parentNode;

        while (pnode != undefined && nodes.length > 1) {
            pnode.position.x += (a - width - leftMargin) / 2;
            pnode = parents[pnode.id];
        }

        if (nodes.length == 0) global_x += width + leftMargin;
    }

    //再帰呼出し
    aa(hierarchyNodes);


    return {
        initNodes: n,
        initEdges: e,
    }
}