
server.on('connection', function(socket) {
  log.info('SOCKET OPENED' + JSON.stringify(socket.address()));
  socket.on('end', function() {
    log.info('SOCKET END: other end of the socket sends a FIN packet');
  });

  // Set & listen for timeout
  socket.setTimeout(2000);
  socket.on('timeout', function() {
    log.info('SOCKET TIMEOUT');
    socket.end(); // have to sever/end socket manually
  });
});