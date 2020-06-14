const route =  require('./src/routes/index');

function init(app) {
  // app.get('/', (req, res) => {
  //   res.sendFile(`${__dirname}/templates/index.html`);
  // });

  app.use('/', route);
  app.use('*', (req, res) => {
    res.status(404).send({
      success: false,
      status_code: 404,
      message: 'NotFound',
      data: null,
      error: 'Requested resource not found!'
    });
  });
}

module.exports = {
  init
};
