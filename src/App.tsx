import React from 'react';
import {DefaultSplitter, Split, RenderSplitterProps} from '@geoffcox/react-splitter';
import {VerticalStripedSplitter, HorizontalStripedSplitter, SolidSplitter} from './CustomSplitters';
import ShadowDom from './ShadowDom';
import EventEmitter from "eventemitter3";
import {MultiFileEditor} from "./editor/MultiFileEditor"
import {FiletreeRoot} from "./filetree/FiletreeRoot";

type Props = {
    emitter: EventEmitter<string | symbol, any>;
}

const App = ({emitter}: Props) => {

    return (
        <>
            <style>
                {`
                    .wrapper {
                      display: grid;
                      grid-template-columns: 1fr;
                      grid-template-rows: auto 1fr auto;
                      gap: 0px 0px;
                      grid-auto-flow: row;
                      grid-template-areas:
                        "top"
                        "middle"
                        "bottom";
                      width: 100%;
                      height: 100%;
                    }
                    
                    .top { 
                            grid-area: top; 
                            padding: 12px; 
                            border-bottom: 3px solid #474757; 
                            }

                    .middle { 
                            grid-area: middle; 
                            }

                    .bottom { 
                            grid-area: bottom;  
                            padding: 12px;
                            border-top: 3px solid #474757; 
                            }
                `}
            </style>

            <div className="wrapper">

                <div className="top" style={{"fontSize": "2em"}}>
                    React OxIDE
                </div>

                <div className="middle App" style={{"backgroundColor": "#262731"}}>
                    <Split
                        renderSplitter={() => <SolidSplitter/>}
                        initialPrimarySize='30%'
                        splitterSize='10px'
                    >
                        <div style={{"height": "100%", "overflowY": "scroll"}}>
              
                                <div style={{"padding": "10px"}}>
                                    <FiletreeRoot emitter={emitter}/>
                                </div>
                       
                        </div>
                        <Split
                            renderSplitter={() => <SolidSplitter color="#474757"/>}
                            splitterSize='10px'
                            horizontal
                            initialPrimarySize='60%'
                        >
                            <div style={{"height": "100%"}}>
                                <MultiFileEditor emitter={emitter}/>
                            </div>
        
                        </Split>
                    </Split>
                </div>
            </div>
        </>
    );
}

export default App;
