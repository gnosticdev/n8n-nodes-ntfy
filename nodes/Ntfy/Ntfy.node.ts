import {
	NodeOperationError,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { ntfyFields, ntfyOperations } from './NtfyDescription';

export class Ntfy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ntfy',
		name: 'ntfy',
		icon: 'file:ntfy.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send notifications via ntfy.sh',
		defaults: {
			name: 'Ntfy',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'ntfyApi',
				required: false,
			},
		],
		requestDefaults: {
			baseURL: 'https://ntfy.sh',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Notification',
						value: 'notification',
					},
				],
				default: 'notification',
			},
			...ntfyOperations,
			...ntfyFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let credentials;
		try {
			credentials = await this.getCredentials('ntfyApi');
		} catch (error) {
			// If credentials are not set, use default configuration
			credentials = { baseUrl: 'https://ntfy.sh' };
		}

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'notification') {
					if (operation === 'publish') {
						const topic = this.getNodeParameter('topic', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as {
							title?: string;
							tags?: string;
							priority?: number;
							click?: string;
							attachment?: string;
							actions?: {
								actionFields: Array<{
									action: string;
									label: string;
									url: string;
									clear: boolean;
									method?: string;
									headers?: string;
									body?: string;
								}>;
							};
						};

						const body: Record<string, unknown> = {
							topic,
							message,
						};

						// Add all additional fields to the body
						Object.entries(additionalFields).forEach(([key, value]) => {
							if (value !== undefined && value !== '') {
								body[key] = value;
							}
						});

						if (additionalFields.tags) {
							body.tags = additionalFields.tags.split(',').map((tag) => tag.trim());
						}

						if (additionalFields.actions?.actionFields) {
							body.actions = additionalFields.actions.actionFields.map((action) => {
								const formattedAction: Record<string, unknown> = {
									action: action.action,
									label: action.label,
									url: action.url,
									clear: action.clear,
								};

								if (action.action === 'http') {
									formattedAction.method = action.method;
									if (action.headers) {
										try {
											formattedAction.headers = JSON.parse(action.headers);
										} catch (error) {
											throw new NodeOperationError(
												this.getNode(),
												'Invalid JSON in action headers',
											);
										}
									}
									if (action.body) {
										formattedAction.body = action.body;
									}
								}

								return formattedAction;
							});
						}

						// Send the request to the root URL
						const response = await this.helpers.httpRequest({
							method: 'POST',
							url: credentials.baseUrl.toString(),
							body,
							headers: {
								'Content-Type': 'application/json',
							},
						});

						returnData.push({ json: response });
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
