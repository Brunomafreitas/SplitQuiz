//const { count } = require('console');
const http = require('http')
const app = require('./app')
 var count = 0;
var nome ;
var jogadores = [];
var respondeu = false;
var countResponder = 0;
const normalizePort = val => {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		return val
	}
	if (port >= 0) {
		return port
	}
	return false
}
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const errorHandler = error => {
	if (error.syscall !== 'listen') {
		throw error
	}
	const address = server.address()
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
	switch (error.code) {
	case 'EACCES':
		console.error(bind + ' requires elevated privileges.')
		process.exit(1)
		break
	case 'EADDRINUSE':
		console.error(bind + ' is already in use.')
		process.exit(1)
		break
	default:
		throw error
	}
}

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
	const address = server.address()
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
	console.log('Listening on ' + bind)
})


// Web sockets
const io = require('socket.io')(server)

io.sockets.on('connection', (socket) => {
	
	//socket.on(io.socket.clients().length)

	socket.on('mouse', (data) => socket.broadcast.emit('mouse', data))

	
	socket.on('name', (name) => {nome = name;  count ++;  for(var i = 0; i < count; i++){
		jogadores[i] = name;
		console.log(count);
	}if(respondeu){
		console.log("Jogador "+jogadores[count]+" Respondeu")
} else if(countResponder < jogadores.length){
	console.log("Aguardando todos os jogadores responderem");
}
})
	
	socket.on('respondeu', (respondeu) => {respondeu = true;countResponder++;
		console.log("Jogador "+nome+" Respondeu")
});

	socket.on('disconnect', () => console.log('Client has disconnected'))
})

server.listen(port)