// eslint-disable-next-line no-async-promise-executor
module.exports = new Promise(async (resolve, reject) => {
  const { importDelegatedModule } = await import(
    '@module-federation/utilities'
  );

  // eslint-disable-next-line no-undef
  const currentRequest = new URLSearchParams(__resourceQuery).get('remote');
  if (!currentRequest) {
    throw new Error('No remote specified');
  }

  const remoteVersion = 'v1';

  const [global, url] = currentRequest
    .replaceAll('[version]', remoteVersion)
    .split('@');

  importDelegatedModule({
    global,
    url: `${url}?ts=${Date.now()}`,
  })
    .then(async (remote) => {
      resolve(remote);
    })
    .catch((error) => {
      reject(error);
    });
});
