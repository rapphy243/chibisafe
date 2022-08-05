<template>
	<footer>
		<div class="container">
			<div class="columns">
				<div class="column is-narrow">
					<h4>rapphsafe</h4>
					<span>© 2017-{{ getYear }}
						<a
							href="https://github.com/pitu"
							class="no-block">Pitu</a>
					</span><br>
					<span>{{ version }}</span>
				</div>
				<div class="column is-narrow bottom-up">
					<a href="https://github.com/rapphy243/chibisafe">GitHub</a>
					<a href="Rapphy243#0142">Rapphy243#0142</a>
				</div>
				<div class="column is-narrow bottom-up">
					<a
						v-if="loggedIn"
						@click="createShareXThing">ShareX Config</a>
					<a href="https://chrome.google.com/webstore/detail/lolisafe-uploader/enkkmplljfjppcdaancckgilmgoiofnj">Chrome Extension</a>
					<a href="https://www.icloud.com/shortcuts/48ac849f13cc4b50b42bc1a478bddcb6">iOS Shortcut</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<script src="https://analytics.rapph.dev/edge/62ec9fa12d17963007859a43/tm.js" async></script> <!-- analytics -->

<script>
/* eslint-disable no-restricted-globals */

import { mapState, mapGetters } from 'vuex';
import { saveAs } from 'file-saver';

export default {
	computed: {
		...mapGetters({
			loggedIn: 'auth/isLoggedIn',
			apiKey: 'auth/getApiKey'
		}),
		...mapState({
			version: state => state.config.version
		}),
		getYear() {
			return new Date().getFullYear();
		}
	},
	methods: {
		createShareXThing() {
			const sharexFile = `{
				"Name": "${this.$store.state.config.serviceName}",
				"DestinationType": "ImageUploader, FileUploader",
				"RequestType": "POST",
				"RequestURL": "${location.origin}/api/upload",
				"FileFormName": "files[]",
				"Headers": {
					"token": "${this.apiKey}",
					"accept": "application/vnd.chibisafe.json"
				},
				"ResponseType": "Text",
				"URL": "$json:url$",
				"ThumbnailURL": "$json:thumb$"
			}`;
			const sharexBlob = new Blob([sharexFile], { type: 'application/octet-binary' });
			saveAs(sharexBlob, `${location.hostname}.sxcu`);
		}
	}
};
</script>

<style lang="scss" scoped>
	@import '~/assets/styles/_colors.scss';
	footer {
		pointer-events: none;
		touch-action: none;

		@media screen and (min-width: 1025px) {
			position: fixed;
			bottom: 0;
			width: 100%;
			> div {
				padding: 1rem 1rem !important;
				max-width: unset !important;
			}
		}

		.container {
			.column {
				pointer-events: auto;
				touch-action: auto;

				text-align: center;
				@media screen and (min-width: 1025px) {
					margin-right: 2rem;
					&.bottom-up {
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						margin-right: 0;
					}
				}

				a {
					display: block;
					color: $textColor;
					&:hover {
						color: white
					}
					&.no-block {
						display: inherit;
					}
				}
			}
		}
	}
</style>
