import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ReactFlow, { useEdgesState, useNodesState, Node, Position, getNodesBounds, ReactFlowProvider, useNodes, useNodesInitialized, useReactFlow, useStore, Controls, Edge } from "reactflow"
import 'reactflow/dist/style.css';

const initialNodes : Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'An inputddddddddddddddddddddddddddddddddd node' },
      position: { x: 0, y: 50 },
    //   sourcePosition: Position.Left,
    },
    {
        id: '2',
        type: 'input',
        data: { label: 'aaaaaaaaa' },
        position: { x: 0, y: 50 },
      //   sourcePosition: Position.Left,
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'bbbbbbbb' },
        position: { x: 0, y: 50 },
        //   sourcePosition: Position.Left,
    },
    {
        id: '4',
        type: 'output',
        data: { label: 'testc' },
        position: { x: 0, y: 50 },
        //   sourcePosition: Position.Left,
    },
    {
        id: '5',
        type: 'output',
        data: { label: 'testc' },
        position: { x: 0, y: 50 },
        //   sourcePosition: Position.Left,
    },
    {
        id: '6',
        type: 'output',
        data: { label: 'testc' },
        position: { x: 0, y: 50 },
        //   sourcePosition: Position.Left,
    },
    {
        id: '7',
        type: 'output',
        data: { label: 'testc' },
        position: { x: 0, y: 50 },
        //   sourcePosition: Position.Left,
    },
    {
        id: '8',
        type: 'output',
        data: { label: 'testc' },
        position: { x: 0, y: 50 },
        //   sourcePosition: Position.Left,
    },
    {
        id: '9',
        type: 'output',
        data: { label: 'testc' },
        position: { x: 0, y: 50 },
        //   sourcePosition: Position.Left,
    },
    {
        id: '10',
        type: 'output',
        data: { label: 'testc' },
        position: { x: 0, y: 50 },
        //   sourcePosition: Position.Left,
    },
    // {
    //     id: '2',
    //     type: 'output',
    //     data: { label: 'Output A' },
    //     position: { x: 54, y: 25 },
    //     targetPosition: Position.Left,
    // },
    // {
    //   id: '3',
    //   type: 'output',
    //   data: { label: 'Output A' },
    //   position: { x: 4, y: 25 },
    //   targetPosition: Position.Left,
    // },
    // {
    //   id: '4',
    //   type: 'output',
    //   data: { label: 'Output B' },
    //   position: { x: 4, y: 100 },
    //   targetPosition: Position.Left,
    // },
  ]; 
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    
    { id: 'e5-6', source: '7', target: '9', animated: true },
    { id: 'e5-6', source: '7', target: '10', animated: true },

    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e6-7', source: '6', target: '7', animated: true },
    { id: 'e7-8', source: '7', target: '8', animated: true },
    { id: 'e5-6', source: '5', target: '6', animated: true },
    
    { id: 'e2-4', source: '2', target: '4', animated: true },
  ];
  

function _OptionPage() {

    return <Box sx={{ width: "100%", height: "100vh" }}>
        <AAA></AAA>
    </Box>
}

const options = {
    includeHiddenNodes: false,
  };

type HierarchyNode = {
    node: Node,
    children: HierarchyNode[],
}

const getNode = (id: string, nodes: HierarchyNode[]) : HierarchyNode | undefined => {

    const node = nodes.find(n => n.node.id == id);
    if (node != undefined) return node;

    for (const n of nodes) {
        const an : HierarchyNode | undefined = getNode(id, n.children);
        if (an != undefined) return an;
    }
    
    return undefined;
}

const createHierarchyNode = (nodes: Node[], edges: Edge[]) => {

    const hiNodes : HierarchyNode[] = [];

    for (const edge of edges) {

        let sourceHiNode = getNode(edge.source, hiNodes);
        let targetHiNode = getNode(edge.target, hiNodes);
        const sourceNode = nodes.find(n => n.id == edge.source);
        const targetNode = nodes.find(n => n.id == edge.target);

        if (sourceNode && targetNode) {

            if (sourceHiNode == undefined) {
                sourceHiNode = { node: sourceNode, children: [] };
                hiNodes.push(sourceHiNode);
            }

            if (targetHiNode == undefined) {
                sourceHiNode.children.push( { node: targetNode, children: [] } );
            }
            else {
                
                const ntree = hiNodes.filter(n => n.node.id != targetHiNode?.node.id);
                hiNodes.length = 0;
                hiNodes.push(...ntree);

                console.log(targetHiNode);
            }
        }
    }

    console.log(hiNodes);
}

const autoLayout = (nodes: Node[], edges: Edge[]) => {

    const nodeTree = [];

    

}
   
function Teee() {
    const { getNodes, setNodes, getEdges } = useReactFlow();
    const nodesInitialized = useNodesInitialized(options);
    const [layoutedNodes, setLayoutedNodes] = useState(getNodes());
   
    useEffect(() => {
      if (nodesInitialized) {

        const nodes = getNodes();
        const edges = getEdges();
        
        createHierarchyNode(nodes, edges);


        // console.log(getNodes());
        // setLayoutedNodes(yourLayoutingFunction(getNodes()));
      }
    }, [nodesInitialized]);
   
    // return layoutedNodes;
    return <></>
  }
  
const AAA = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // const a = useLayout() ;
    // const a = useReactFlow();

    // console.log(a);

    const onClick = () => {
        setNodes([ {
            id: '2',
            type: 'output',
            data: { label: 'An dawodiwaoio' },
            position: { x: 0, y: 50 },
          } , ...nodes]);
    }

    // const aa = getNode()

    return (
        <ReactFlowProvider>
            <ReactFlow nodes={nodes} edges={edges} >
                <Teee></Teee>
                <Controls />
            </ReactFlow>
            <Button onClick={onClick}>TEST</Button>

        </ReactFlowProvider>
    )

}

export default _OptionPage