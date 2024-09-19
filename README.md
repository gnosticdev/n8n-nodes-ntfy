# n8n-nodes-ntfy

This is an n8n community node for [ntfy](https://ntfy.sh/).

Ntfy is a simple notification service that lets you send messages to your phone, email, or other devices. It's a great way to get notifications from your scripts, cron jobs, or any other program.

The ntfy.sh server is free to use, but you can also host your own server (or even add it as a service with n8n in a docker container). Check out the [ntfy docs](https://ntfy.sh/docs/) for more information.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Publish a message to a topic

## Credentials

- Base URL: The base URL of your ntfy.sh server (uses default of `https://ntfy.sh` if left blank)
- Authentication: The authentication method to use (uses `Authorization: Bearer <token>` if left blank)

## Compatibility

- n8n v0.200.0 and later

## Usage

Create a topic in Ntfy, either in the mobile app, website, api, cli, etc. Then use enter the topic name in the Ntfy node. That's pretty much it! You can add optional title, clickable URL, actions, tags (emojis), etc.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Ntfy documentation](https://ntfy.sh/)

## Version history

- v1.0.0: Initial release
