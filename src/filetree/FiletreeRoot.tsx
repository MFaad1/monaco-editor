import React, {useEffect,useCallback} from "react"
import Sidebar from "./components/sidebar"
import {FileTree} from "./components/FileTree"
import {useWebdav} from "../useWebdav"
import "./styles.css"
import {RenameModal} from "./components/RenameModal";
import EventEmitter from "eventemitter3";
import {FileTreeEntry} from "../typedefs";
import {NewfileModal} from "./components/NewfileModal";
import {NewfolderModal} from "./components/NewfolderModal";
import {UploadModal} from "./components/UploadModal";



const dummyFiles = [
    {
        containingDirectoryPath: "",
        depth: 0,
        dummy: true,
        filePath: "loading...",
        id: "",
        isDirectoryOpen: false,
        isSelected: false,
        type: "directory",
    }
]

type Props = {
    emitter: EventEmitter<string | symbol, any>;
}

export const FiletreeRoot = ({emitter}: Props) => {
    // const {getDirectoryItems} = useWebdav({emitter})
    // let getDirectoryItems:any
    const [getFiletreeItems, setFiletreeItems] = React.useState<Array<FileTreeEntry>>(dummyFiles)


    // ...
    
    const handleDrop = useCallback(async (event: any) => {
        event.preventDefault();
    
        const items = event.dataTransfer.items;
    
        for (let i = 0; i < items.length; i++) {
            const item = items[i].webkitGetAsEntry();
    
            if (item) {
                if (item.isDirectory) {
                    // Handle directory: recursively process its contents
                    const folderStructure = await processDirectory(item);
                    console.log('Folder Structure:', folderStructure);
                    setFiletreeItems(folderStructure)
                    emitter.emit("ON_FILE_LOADED", folderStructure);
                } else {
                    // Handle file
                    console.log('File:', item.name);
                }
            }
        }
    }, []);
    
    const processDirectory = async (directoryEntry: any) => {
        const directoryReader = directoryEntry.createReader();
        const entries:any = await readEntries(directoryReader);
    
        const folderStructure = entries.map((entry: any) => {
            if (entry.isDirectory) {
                return {
                    containingDirectoryPath: directoryEntry.fullPath,
                    depth: entry.fullPath.split('/').length - 1,
                    dummy: true,
                    filePath: entry.fullPath,
                    id: Math.floor(Math.random() * 900000), // Generate a unique ID for each entry
                    isDirectoryOpen: false,
                    isSelected: false,
                    type: 'directory',
                };
            } else {
                // Handle file
                console.log('File:', entry.name);
                return null; // You can handle files differently or skip them if not needed in the structure
            }
        });
    
        return folderStructure.filter(Boolean); // Remove null entries (files) from the array
    };

    const readEntries = (directoryReader: any) => {
        return new Promise((resolve) => {
            directoryReader.readEntries((entries: any) => {
                resolve(entries);
            });
        });
    };
    
    // ...
    
      const handleDragOver = useCallback((event:any) => {
        event.preventDefault();
      }, []);

    useEffect(() => {
        // setFiletreeItems(getDirectoryItems)
    }, []);

    return (
        <>    
         <div
      style={{ border: '2px dashed #ccc', padding: '20px' }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      Drop files or folders here
    </div>
        <button>asd fksdk</button>
      
        <div style={{"padding": "10px"}}>

            <div style={{"display": "flex", "flexDirection": "column"}}>

                <div>
                    <span style={{"fontSize": "1.1em", "fontWeight": 600, "color": "white"}}>Files</span>
                    <hr style={{"height": "3px", "backgroundColor": "#474757", "border": "0"}}/>
                </div>
                <RenameModal emitter={emitter} />
                <NewfileModal emitter={emitter} />
                <NewfolderModal emitter={emitter} />
                <UploadModal emitter={emitter}/>
                <Sidebar>
                    <FileTree
                        allFiles={getFiletreeItems}
                        emitter={emitter}
                        files={getFiletreeItems}
                    />
                </Sidebar>
            </div>
        </div>
        </>
    )
}



