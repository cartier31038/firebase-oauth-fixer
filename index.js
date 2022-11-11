const googleAuth = require('google-auth-library')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()

const GCIP_API_BASE = 'https://identitytoolkit.googleapis.com/v2'
const SCOPES = ['https://www.googleapis.com/auth/cloud-platform']

// Application configs
const PROJECT_ID = process.env.PROJECT_ID
const IDP_ID = process.env.IDP_ID
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const SERVICE_ACCOUNT_FILE = process.env.SERVICE_ACCOUNT_FILE

async function getAccessToken() {
    const serviceAccount = require(`./secrets/${SERVICE_ACCOUNT_FILE}`)
    const jwtClient = new googleAuth.JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        SCOPES,
        null,
    )
    const credential = await jwtClient.authorize()
    return credential.access_token
}

/**
 * Read more: https://firebase.google.com/docs/projects/provisioning/configure-oauth#add-idp
 */
async function addIdpConfig(
    projectId,
    accessToken,
    idpId,
    clientId,
    clientSecret,
) {
    const uri = `${GCIP_API_BASE}/projects/${projectId}/defaultSupportedIdpConfigs?idpId=${idpId}`
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            name: `projects/${projectId}/defaultSupportedIdpConfigs/${idpId}`,
            enabled: true,
            clientId: clientId,
            clientSecret: clientSecret,
        }),
    }
    return fetch(uri, options).then((response) => {
        if (response.ok) {
            return response.json()
        } else if (response.status == 409) {
            throw new Error(
                'IdP configuration already exists. Update it instead.',
            )
        } else {
            throw new Error('Server error.')
        }
    })
}

;(async () => {
    const accessToken = await getAccessToken()
    console.log('Access token', accessToken)

    try {
        const result = await addIdpConfig(
            PROJECT_ID,
            accessToken,
            IDP_ID,
            CLIENT_ID,
            CLIENT_SECRET,
        )
        console.log('Add IdP result', result)
    } catch (err) {
        console.error(err.message)
    }
})().catch(console.error)
