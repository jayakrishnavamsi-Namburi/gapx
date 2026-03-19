import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

export default admin;








// {
//   "type": "service_account",
//   "project_id": "gapx-19d15",
//   "private_key_id": "f81b44a01c156b96c42c368944be265d6e3555c8",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDsQ2JPqrcMC79Y\nADfEdoN8GNtGYSJWhwu5OigPOu9uj2h9Lh1J8jHnVBE2EZ7ZE1txqaROkJ465+dK\nl27L95qfPKzo8R5zyS7aMhyrR8tgcIoUTqL34+zA3y5bYKpk97K207kqHSfPRodf\ngteyQikO5XPTzzHn/1sa3Deg9AWZqB0QloQXfCsnGRii94ue+3ml1VT9UJmH9HFT\nJUkPW4oUCRQ/a+JAD0ZN4+LTgNTqjcIAIhmk1QVbv+XfsnO9TiKNVHyVHNfaHBGu\nnvxLbn814tu5saFpkRTeHxXEDZlx2guTSCjaIH6YB/BdJBoj3ZObT2CdrVeHySr6\namMOEccjAgMBAAECggEAb3FFcTCkUQFFizvnEjuYv7N10tfEe64NoJxHAxAYmjz4\n23siA5xDX8tupuNe2yPfUVjkkM50ZHK4zZ1qfLlZbN0Q7nu1koYGHJPgpAYkb2QG\nLZf+FRGkvkFHu4B4P1H7MXPi9nN0MLgi6LFuDr5YYZdnsDQeZUE09xGDB9+yuIwE\nyw6GvGSfy8enBIZd1kLmOkCe1xFTbf03x7vynnJwASu972r0y/5cRg5clGb3c6uA\nC0GjgobfdCf1YT8aEYaf5Q5UrtNwwp8Pj3i+XcVQ+rPhTfW8D7adA9gFb+0FtoVO\nYjG6/dleHDUKyqdsbEX1iMPGm96SfhtYbrLUxPZAgQKBgQD4sfhVlbO75zUq9Uhr\nNJGnI7zAA00dM2L5Y9EJ9uyRPCMnIkV96Ed+0Ji0iC7rl+BmhaX5NfWDyGHSIGcm\nOc3/jYm0za6QgDDpQbVKkh9E7JU7xggRnSwGBmCI5gPtJTNPc81Te2lYu7C95QoY\n31eOfmoXhI40l2Hu4Uej7lyCYwKBgQDzM+7zcgMp/VrIjUjQ/iVQtsqOAZ9tQ5gv\nwWL7+OGZH3vd3d15KZo/Faf502kRMTI91VmYeCDe46BhkKIfEz/+mOMBX8wotbwi\nmWoBkWVukwho24v/TW/PMnc6tX0b8YgteSx3SAFOrKwSf17r3O3zsxdTjVTpi0PY\nIlnDgaJkQQKBgQCOroyrjZfw1lXKr6880ow+OGKyRzKW7kR6kKn97Y0MRlRkv2Tf\nN8TNHSB/cyJ4SEqWh1cSA8M4OF7nD3AenktxsuKuuNLOVL27FdfNUMhf4tw7zwIS\nGPqI+l+oK09VX2Jw0x+aJdPq9MQSLrX8TycMubpkg8iSo8esJdPUWYz5wQKBgBJs\nu8ybtZunwwnwkjSrHF6aCoxpmQ9pEI2FpB8cwtKb7QFo/o9gVHw1As3Nc2dHB9xh\nXnFLoIniStM5Zt7d0XpTUNdYz5nB8ufYIYzO3BVddESlZVzJHBBhbWD4QOsuCDgR\ntwmuXdL9B+g62BEcYraUuc6tpWIwF8q3B3/lQU1BAoGANsIk/ggkZcJKhgWWzbQy\nVNm6oxVpwmnym0bpoHdLIuPCbDB5kKMGZ9tWbdFpLAGoAEVu97upe2QLlaDVdz6+\nAiGf1S7xxln9r83VWDwvVFistGgWLajCif8w737SCVK04Mybuv5C1uY+lUrgnCq8\nTnazuz3h81HD0fGCF3vJUUM=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-fbsvc@gapx-19d15.iam.gserviceaccount.com",
//   "client_id": "117140807294067639386",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40gapx-19d15.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }
