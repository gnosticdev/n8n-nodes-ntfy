import fs from 'fs';
import path from 'path';

function copyFiles(source, destination, extensions) {
	if (!fs.existsSync(destination)) {
		fs.mkdirSync(destination, { recursive: true });
	}

	const files = fs.readdirSync(source, { withFileTypes: true });

	for (const file of files) {
		const sourcePath = path.join(source, file.name);
		const destPath = path.join(destination, file.name);

		if (file.isDirectory()) {
			copyFiles(sourcePath, destPath, extensions);
		} else if (extensions.some((ext) => file.name.endsWith(ext))) {
			fs.copyFileSync(sourcePath, destPath);
		}
	}
}

function copyIcons() {
	const extensions = ['.png', '.svg'];

	// Copy node icons
	const nodeSource = path.resolve('nodes');
	const nodeDestination = path.resolve('dist', 'nodes');
	copyFiles(nodeSource, nodeDestination, extensions);

	// Copy credential icons
	const credSource = path.resolve('credentials');
	const credDestination = path.resolve('dist', 'credentials');
	copyFiles(credSource, credDestination, extensions);
}

copyIcons();
