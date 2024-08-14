# Crypto Glance

This project is a crypto dashboard that allows to view and manage crypto assets. Track the prices of crypto asset, view distribution, and execute real transfer. support multiple crypto.

# File structure

```
/project-root
│
├── /src
│   ├── /assets             # Component for small part
│   │   └─ /Tokens          # Crypto Token List (ex: eth, sepolia)
│   ├── /components
│   ├── /contexts           # customize context, provide Mui theme, color mode, update balance...
│   ├── /hooks              # customize hook, include store
│   ├── /pages              # whole page folder
│   ├── /utils
```

# Install

1. clone project

```
  git clone https://github.com/your-repo/crypto-dashboard.git
  cd crypto-dashboard
```

2. install

```
npm install
```

3. configure `.env` file

```shell
cp .env.local.sample .env.local
```

```
VITE_WALLECT_PROJECT_ID=  # walletconnect Project ID
```

4. start server

```
npm run dev
```

default server base on `http://localhost:5173`
