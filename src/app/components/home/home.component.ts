import { Component, OnInit, NgZone } from '@angular/core';
import * as shutdownCommand from 'electron-shutdown-command';
//import { app } from 'electron';
import {ElectronService} from '../../providers/electron.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	eventToDoList: any;
	selectedEventTodo: any;
	minutes: number;
    shutdownCmd: typeof shutdownCommand;
   // theApp: typeof app;
  constructor(   private zone: NgZone, private electronService: ElectronService) {
      if(this.isElectron()) {
                this.shutdownCmd = window.require('electron-shutdown-command');
                //this.theApp =  window.require('electron').app;
      }
  	this.selectedEventTodo = {id: 3};
   }
  isElectron = () => {
    return window && window.process && window.process.type;
  }
  ngOnInit() {
  	this.eventToDoList = [
    {
        id: 1,
        description: 'shutrown'
    },
    {
        id: 2,
        description: 'hibernate'
    },
     {
        id: 3,
        description: 'mute or pause player'
    },
     {
        id: 4,
        description: 'Abort'
    }
	];
  }
      onSelectionChange(entry) {
        this.selectedEventTodo = entry;
        console.log(entry);
    }
    close(){
           var result = confirm("annuler la tache en cour ?");
           if(result) {
                                                  if(process.platform !=="darwin") {
                                       this.shutdownCmd.abort({debug: true});
                                   }
                               } 
                               try {
     if (process.platform !== 'darwin') {
          this.electronService.remote.getCurrentWindow().close()
    }
}    
catch(e) {
    console.log(e)
}

    }
    doYourThing() {
    	console.log(process.env);
    	let selectedId = this.selectedEventTodo.id;
    	switch (selectedId) {
    		case 1: {
    			    	if(!!this.minutes) {
    		let seconde = this.minutes * 60;
    		let options: any = { debug :false, timerseconds: seconde, sudo: true, quitapp: false, force: false};
    		//if(process.platform === "darwin") {
    		//	options.sudo = true;
    		//	options.quitapp= false;
    		// } else if (process.platform === "win32")
    		// {
    		// 	options.force = false;
    		// } else if (process.platform === "linux") {
    		// 	options.sudo = true;
    		// }
    		 	this.shutdownCmd.shutdown(options);
    	} else {
    		this.shutdownCmd.shutdown({debug: true});

    	}
    			// code...
    		}
    			break;
    		    		case 2: {
    		 if(!!this.minutes) {
    		let seconde = this.minutes * 60;
                        let options: any = { debug :false, timerseconds: seconde, sudo: true, quitapp: false, force: false};
            if(process.platform ==="darwin") {
                this.shutdownCmd.sleep(options)
            } else if (process.platform ==="win32"){
                this.shutdownCmd.hibernate(options);
            }
    	} else {
    		if(process.platform ==="darwin") {
    			this.shutdownCmd.sleep({debug: true})
    		} else if (process.platform ==="win32"){
    			this.shutdownCmd.hibernate({debug: true});
    		}

    	}
    			// code...
    		}
    			break;
    			    		case 3: {
    			// code...
    		}
    			break;
       			    		case 4: {
       			    			if(process.platform !=="darwin") {
       			    				this.shutdownCmd.abort({debug: false});
       			    			}
    			// code...
    		}
    			break;
    		default:
    			// code...
    			break;
    	}
    }

}
