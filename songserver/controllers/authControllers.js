const dotenv = require('dotenv');
const querystring = require('node:querystring');
dotenv.config();
const redirect_uri = 'http://localhost:8000/callback';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
module.exports.login = async(req,res)=>{
    const state = Math.random().toString(36).slice(2);
    console.log(client_id);
    console.log(state);
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));
}
module.exports.callback = async(req,res)=>{
    console.log("here");
    const code = req.query.code || null;
    const state = req.query.state || null;
    if (state === null) {
        console.log("whut");
        res.redirect('/#' +
          querystring.stringify({
            error: 'state_mismatch'
          }));
      } else {
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: "http://localhost:3000",
            grant_type: 'authorization_code'
          },
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
          },
          json: true
        };
      }
}