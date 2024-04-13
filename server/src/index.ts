import express from 'express'
import expressWs from 'express-ws'

const { app, getWss } = expressWs(express())
const websocket = getWss()

// middlewares
app.use(express.json())

const players: Record<string, any> = {}
const playersConnections = new Map<any, string>()

app.ws('/game', (ws, req, next) => {
  console.log('Socket Connected')

  ws.onmessage = function (event) {
    const message = JSON.parse(event.data as string)

    if (message.type === 'start') {
      players[message.data.playerId] = message.data
      playersConnections.set(ws, message.data.playerId)

      websocket.clients.forEach(function (client) {
        const evMessage = JSON.stringify({ type: 'start', data: players })
        client.send(evMessage)
      })
    }

    if (message.type === 'update') {
      players[message.data.playerId] = message.data

      websocket.clients.forEach(function (client) {
        const evMessage = JSON.stringify({ type: 'update', data: message.data })
        client.send(evMessage)
      })
    }

    if (message.type === 'shoot') {
      websocket.clients.forEach(function (client) {
        const evMessage = JSON.stringify({ type: 'shoot', data: message.data })
        client.send(evMessage)
      })
    }

    if (message.type === 'damage') {
      console.log('event')
      players[message.data.playerId].health--

      websocket.clients.forEach(function (client) {
        const evMessage = JSON.stringify({ type: 'damage', data: players[message.data.playerId] })
        client.send(evMessage)
      })
    }
  }

  ws.onclose = () => {
    const playerId = playersConnections.get(ws)
    if (playerId) {
      console.log(`Socket disconnected for player ${playerId}`)
      players[playerId] = undefined
      playersConnections.delete(ws)

      websocket.clients.forEach(function (client) {
        const evMessage = JSON.stringify({ type: 'disconnection', data: { playerId } })
        client.send(evMessage)
      })
    }
  }
})

// running app
app.listen(3800, () => {
  console.log(`Server on port ${3800}`)
})
