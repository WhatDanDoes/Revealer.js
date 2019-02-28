(function(){
  var socket = io.connect(host);

  Reveal.initialize({
    history: true,
    dependencies: [
      { src: '/components/reveal.js/plugin/markdown/marked.js' },
      { src: '/components/reveal.js/plugin/markdown/markdown.js' },
      { src: '/components/reveal.js/plugin/notes/notes.js', async: true },
      { src: '/components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
    ]
  });

  /** start - only in master.js **/
  notifyServer = function(event){
    data = {
      indexv : Reveal.getIndices().v,
      indexh : Reveal.getIndices().h,
      indexf : Reveal.getIndices().f || 0
    }
    socket.emit("slidechanged" , data);
  }
  // listeners for slide change/ fragment change events
  Reveal.addEventListener("slidechanged", notifyServer);
  Reveal.addEventListener("fragmentshown", notifyServer);
  Reveal.addEventListener("fragmenthidden", notifyServer);
  /** end - only in master.js **/

  // Move to corresponding slide/ frament on receiving 
  // slidechanged event from server
  socket.on('slidechanged', function (data) {
    Reveal.slide(data.indexh, data.indexv, data.indexf);
  });
  
})();
