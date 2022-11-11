<h1 align="center">Firebase OAuth2.0 Fixer</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Fixer OAuth2.0 sign-in method for Firebase project
    <br>
</p>


## 🧐 About <a name = "about"></a>

When we manual delete credential from 'GCP > APIs & Services > OAuth 2.0 Client IDs'.

  - Example URL: https://console.cloud.google.com/apis/credentials?authuser=0&project=praneat-internal

But isn't init provider from 'Firebase > Authentication > Sign-in method' yet.

- Example URL: https://console.firebase.google.com/u/0/project/praneat-internal/authentication/providers

If you need to add provider to Firebase Authentication, you will encounter initialize problem, Firebase alway recognize old OAuth 2.0 client credential.

So we need to manual provisioning OAuth2.0 IdP by ourself via Default Supported Idp Configs Google API.

---

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites
1. Install Node.js runtime into your local machine
  https://nodejs.org/en/download/

### Configuration
1. Download service account key into ./secret folder
    - Example URL: https://console.cloud.google.com/iam-admin/serviceaccounts/details/107950069974918825769/keys?authuser=0&project=praneat-internal
2. Config .env file
   1. PROJECT_ID
      - Is GCP / Firebase Project ID
   2. IDP_ID
      - Is provider that you need to manual provision
      - [Provider list](https://firebase.google.com/docs/projects/provisioning/configure-oauth)
   1. CLIENT_ID
      - Is OAuth 2.0 client id
      - Copy it from 'GCP > APIs & Services > OAuth 2.0 Client IDs > [Client Platform]'
   1. CLIENT_SECRET
      - Is OAuth 2.0 client secret
      - Copy it from 'GCP > APIs & Services > OAuth 2.0 Client IDs > [Client Platform]'
   2. SERVICE_ACCOUNT_FILE
      - Is service account file name that downloaded from Configuration step 1.)

### Running fixer
```
yarn start
```

---

## 🎉 References <a name = "reference"></a>
- https://firebase.google.com/docs/projects/provisioning/configure-oauth