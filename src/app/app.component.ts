import { AfterViewInit, Component, ViewChild } from '@angular/core';


import Quill from 'quill';
import QuillCursors from "quill-cursors";

import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'

var document: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})


export class AppComponent implements AfterViewInit {
  objectFormat = [
    { insert: 'Hello ' },
    { insert: 'World!', attributes: { bold: true } },
    { insert: '\n' }
  ]

  quill: any;
  ydoc: any;
  ytext: any;
  binding: any;

  @ViewChild("editor",{static: false}) editor: any;
  
  ngAfterViewInit() {

    Quill.register('modules/cursors', QuillCursors);
    this.quill = new Quill(this.editor.nativeElement, {
      modules: {
        cursors: true,
        toolbar: [
          // adding some basic Quill content features
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ],
        history: {
          // Local undo shouldn't undo changes
          // from remote users
          userOnly: true
        }
      },
      placeholder: 'Start collaborating...',
      theme: 'snow' // 'bubble' is also great
    })
  
    // A Yjs document holds the shared data
    this.ydoc = new Y.Doc();
  
    // Define a shared text type on the document
    this.ytext = this.ydoc.getText('quill');
  
    // Create an editor-binding which
    // "binds" the quill editor to a Y.Text type.
    this.binding = new QuillBinding(this.quill, this.ytext)
  }
  
}

