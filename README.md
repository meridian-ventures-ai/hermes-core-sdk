# Hermes SDK

The Hermes SDK provides an easy interface for interacting with the Hermes Core API, allowing you to manage chats, leads, messages, and more.

## Features

- Manage chats, messages, and leads
- Typed API responses
- Easy authentication with API keys or JWT
- Pagination support

## Installation

```bash
yarn add hermes-sdk
# or
npm install hermes-sdk
```

## Usage

```typescript
import { HermesClient } from "hermes-sdk";

const sdk = new HermesClient({
  baseUrl: "https://api.hermescore.com",
  jwtToken: "YOUR_JWT_TOKEN", // or use apiKey/tenantId if needed
});

async function getChats() {
  const chats = await sdk.chats.getChats();
  console.log(chats);
}

getChats();
```

## API Overview

### Authentication

- **JWT Token:** Pass the `jwtToken` config parameter.
- **API Key & Tenant:** Pass `apiKey` and `tenantId` in the config.

### Services

#### Chats

- `sdk.chats.getChats()`
- `sdk.chats.getChat(chatId)`
- `sdk.chats.createChat({ ... })`

#### Leads

- `sdk.leads.getLeads()`
- `sdk.leads.createLead({...})`
- `sdk.leads.getLead(leadId)`

#### Messages

- `sdk.messages.getMessages(chatId)`
- `sdk.messages.createMessage({...})`

## Development

Build the SDK:

```bash
yarn build
```

## Local Development: Using `yarn link` (Recommended)

For active development in both the SDK and consuming project, use `yarn link` to symlink the local SDK—so any SDK code changes reflect immediately in your app (agent).

### 1. Link the SDK Locally

**In the `hermes-sdk` directory:**

```bash
yarn build

yarn link
```

### 2. Connect Your Agent Project to the SDK

**In your agent project directory (e.g., `agent-chat-client1`):**

```bash
yarn link "@meridian-ventures-ai/hermes-core-sdk"
```

### 3. Run Both Projects in Watch Mode

- **Terminal 1: Watch and Build the SDK**
  ```bash
  cd hermes-sdk
  yarn build --watch
  ```

- **Terminal 2: Start Your Agent Project**
  ```bash
  cd agent-chat-client1
  yarn dev
  ```

> Changes in the SDK will trigger rebuilds and immediately reflect in your agent project. ✨

### 4. Unlink When Done

To return to using the published SDK version:

**In your agent project:**
```bash
yarn unlink "@meridian-ventures-ai/hermes-core-sdk"
yarn install --force
```

**In the SDK project:**
```bash
yarn unlink
```

---

## Publishing & Versioning

To publish a new version or update an existing tag, follow these steps:

1. **Commit Your Changes**

    ```bash
    git add .
    git commit -m "Describe your changes"
    ```

2. **Build the SDK**

    ```bash
    yarn build
    ```

3. **Update the Version (optional)**  
   Change the version in `package.json` as appropriate.

4. **Tag the Release**

    ```bash
    git tag vX.Y.Z    # e.g., git tag v1.0.1
    ```

    - If updating the tag to the same version, force update with:
      ```bash
      git tag -f vX.Y.Z
      git push origin -f vX.Y.Z
      ```

5. **Push to GitHub**

    ```bash
    git push origin main
    git push origin --tags
    ```

    If updating, remember to force-push the tag as shown above.

6. **(Optional) Publish to npm**

    ```bash
    npm publish
    ```

## Contributing

1. Fork this repo
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

## License

MIT

## Repository

[https://github.com/meridian-ventures-ai/hermes-sdk](https://github.com/meridian-ventures-ai/hermes-sdk)

