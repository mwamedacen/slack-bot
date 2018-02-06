export function isSlack(event) {
  return event.message.address.channelId === 'slack';
}

export function isEmulator(event) {
  return event.message.address.channelId === 'emulator';
}
