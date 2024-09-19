import type { INodeProperties } from 'n8n-workflow';

export const ntfyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['notification'],
			},
		},
		options: [
			{
				name: 'Publish',
				value: 'publish',
				description: 'Publish a notification to a topic',
				action: 'Publish a notification',
			},
		],
		default: 'publish',
	},
];

export const ntfyFields: INodeProperties[] = [
	{
		displayName: 'Topic',
		name: 'topic',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['publish'],
			},
		},
		description: 'The topic to send the notification to',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['publish'],
			},
		},
		description:
			'The message body of the notification. To add more parameters, use the Additional Fields section.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['publish'],
			},
		},
		options: [
			{
				displayName: 'Actions',
				name: 'actions',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'actionFields',
						displayName: 'Action Fields',
						values: [
							{
								displayName: 'Action',
								name: 'action',
								type: 'options',
								options: [
									{
										name: 'View',
										value: 'view',
									},
									{
										name: 'Broadcast',
										value: 'broadcast',
									},
									{
										name: 'HTTP',
										value: 'http',
									},
								],
								default: 'view',
								description: 'Action type',
							},
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
								description: 'Label of the action button',
							},
							{
								displayName: 'URL',
								name: 'url',
								type: 'string',
								default: '',
								description: 'URL to open when the action is tapped',
							},
							{
								displayName: 'Clear',
								name: 'clear',
								type: 'boolean',
								default: false,
								description: 'Clear the notification after the action is tapped',
							},
							{
								displayName: 'Method',
								name: 'method',
								type: 'options',
								options: [
									{
										name: 'GET',
										value: 'GET',
									},
									{
										name: 'POST',
										value: 'POST',
									},
									{
										name: 'PUT',
										value: 'PUT',
									},
									{
										name: 'DELETE',
										value: 'DELETE',
									},
								],
								default: 'GET',
								description: 'HTTP method for the action',
								displayOptions: {
									show: {
										action: ['http'],
									},
								},
							},
							{
								displayName: 'Headers',
								name: 'headers',
								type: 'string',
								default: '',
								description: 'HTTP headers for the action (JSON format)',
								displayOptions: {
									show: {
										action: ['http'],
									},
								},
							},
							{
								displayName: 'Body',
								name: 'body',
								type: 'string',
								default: '',
								description: 'HTTP body for the action',
								displayOptions: {
									show: {
										action: ['http'],
									},
								},
							},
						],
					},
				],
			},
			{
				displayName: 'Attachment URL',
				name: 'attachment',
				type: 'string',
				default: '',
				description: 'URL of the attachment to be included in the notification',
			},
			{
				displayName: 'Click URL',
				name: 'click',
				type: 'string',
				default: '',
				description: 'Website opened when notification is clicked',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{
						name: 'Min',
						value: 1,
					},
					{
						name: 'Low',
						value: 2,
					},
					{
						name: 'Default',
						value: 3,
					},
					{
						name: 'High',
						value: 4,
					},
					{
						name: 'Max',
						value: 5,
					},
				],
				default: 3,
				description: 'Message priority with 1=min, 3=default and 5=max',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags that may or not map to emojis',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Message title; if not set defaults to ntfy.sh/&lt;topic&gt;',
			},
		],
	},
];
