<!--
  - @copyright Copyright (c) 2023 Grigorii Shartsev <grigorii.shartsev@nextcloud.com>
  -
  - @author Grigorii Shartsev <grigorii.shartsev@nextcloud.com>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -->

<template>
	<div class="about">
		<h2>{{ t('talk_desktop', 'About') }}</h2>
		<p>{{ $options.packageInfo.productName }} - {{ $options.packageInfo.description }}</p>
		<ul class="about__list">
			<li>
				{{ t('talk_desktop', 'Privacy and Legal Policy') }}: <a class="link" href="https://nextcloud.com/privacy/" target="_blank">https://nextcloud.com/privacy/</a>
			</li>
			<li>
				{{ t('talk_desktop', 'License') }}: <a class="link" href="https://www.gnu.org/licenses/agpl-3.0.txt" target="_blank">{{ $options.packageInfo.license }}</a>
			</li>
			<li>
				{{ t('talk_desktop', 'Issues') }}: <a :href="$options.packageInfo.bugs" class="link" target="_blank">{{ $options.packageInfo.bugs }}</a>
			</li>
			<li>
				{{ t('talk_desktop', 'Source Code') }}: <a :href="$options.packageInfo.repository" class="link" target="_blank">{{ $options.packageInfo.repository }}</a>
			</li>
		</ul>
		<NcTextArea :aria-label="t('talk_desktop', 'System report')"
			:value="report"
			rows="11"
			readonly
			class="about__report"
			@focus="$event.target.setSelectionRange(0, -1)" />
		<p>
			<NcButton type="secondary" wide @click="close">
				<template #icon>
					<MdiWindowClose />
				</template>
				{{ t('talk_desktop', 'Close') }}
			</NcButton>
		</p>
	</div>
</template>

<script>
import MdiWindowClose from 'vue-material-design-icons/WindowClose.vue'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcTextArea from '@nextcloud/vue/dist/Components/NcTextArea.js'
import { translate as t } from '@nextcloud/l10n'

import { appData } from '../../app/AppData.js'

export default {
	name: 'HelpApp',

	components: {
		MdiWindowClose,
		NcButton,
		NcTextArea,
	},

	inheritAttrs: false,

	packageInfo: window.TALK_DESKTOP.packageInfo,

	computed: {
		report() {
			return [
				'----------------------------System report----------------------------',
				`Nextcloud Talk Desktop version ${window.TALK_DESKTOP.packageInfo.version}`,
				`- Built with Nextcloud Talk version ${window.TALK_DESKTOP.packageInfo.talkVersion}`,
				'',
				...(appData.credentials
					? [
						'Connected to:',
						`- Server address: ${appData.serverUrl}`,
						`- Nextcloud Server version ${appData.version.nextcloud.string}`,
						`- Nextcloud Talk version ${appData.version.talk}`,
					]
					: ['Not connected to any server']),
				'',
				`OS: ${window.OS.version}`,
				'----------------------------System report----------------------------',
			].join('\n')
		},
	},

	mounted() {
		window.addEventListener('keyup', this.handleEscape)
	},

	beforeDestroy() {
		window.removeEventListener('keyup', this.handleEscape)
	},

	methods: {
		t,

		handleEscape(event) {
			if (event.key === 'Escape') {
				this.close()
			}
		},

		close() {
			window.close()
		},
	},
}
</script>

<style scoped>
.about {
	height: 100%;
	background: var(--color-main-background);
	padding: 15px;
}

.about__list {
	list-style: '-' inside;
}

.about__report {
	width: 100%;
	resize: none;
}

.about .link {
	text-decoration: underline;
}
</style>
