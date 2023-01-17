/*
 * @copyright Copyright (c) 2022 Grigorii Shartsev <grigorii.shartsev@nextcloud.com>
 *
 * @author Grigorii Shartsev <grigorii.shartsev@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

require('dotenv').config()

const DEV_SERVER_HOST = process.env.NEXTCLOUD_DEV_SERVER_HOSTS ?? 'https://nextcloud.local'

module.exports = {
	packagerConfig: {
		icon: './spreed/img/favicon.ico',
	},
	rebuildConfig: {},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {},
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin'],
		},
		{
			name: '@electron-forge/maker-deb',
			config: {},
		},
		{
			name: '@electron-forge/maker-rpm',
			config: {},
		},
	],
	plugins: [
		{
			name: '@electron-forge/plugin-webpack',
			config: {
				mainConfig: './webpack.main.config.js',
				devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data: blob: ${DEV_SERVER_HOST}; script-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob:`,
				renderer: {
					config: './webpack.renderer.config.js',
					entryPoints: [
						{
							name: 'welcome_window',
							html: './src/welcome/welcome.html',
							js: './src/welcome/welcome.js',
						},
						{
							name: 'accounts_window',
							html: './src/accounts/renderer/accounts.html',
							js: './src/accounts/renderer/accounts.main.js',
							preload: {
								js: './src/preload.js',
							},
						},
						{
							name: 'talk_window',
							html: './src/talk/renderer/talk.html',
							js: './src/talk/renderer/talk.main.js',
							preload: {
								js: './src/preload.js',
							},
						},
					],
				},
			},
		},
	],
}