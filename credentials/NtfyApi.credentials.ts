import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NtfyApi implements ICredentialType {
	name = 'ntfyApi';
	displayName = 'Ntfy API';
	documentationUrl = 'https://docs.ntfy.sh/publish/#authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://ntfy.sh',
			required: true,
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'options',
			options: [
				{
					name: 'None',
					value: 'none',
				},
				{
					name: 'Access Token',
					value: 'accessToken',
				},
				{
					name: 'Username/Password',
					value: 'usernamePassword',
				},
			],
			default: 'none',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			displayOptions: {
				show: {
					authentication: ['usernamePassword'],
				},
			},
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					authentication: ['usernamePassword'],
				},
			},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization:
					'={{$credentials.authentication === "accessToken" ? "Bearer " + $credentials.accessToken : $credentials.authentication === "usernamePassword" ? "Basic " + Buffer.from($credentials.username + ":" + $credentials.password).toString("base64") : undefined}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/{{}}',
			method: 'POST',
			body: {
				message: 'n8n Ntfy credential test',
			},
		},
	};
}
