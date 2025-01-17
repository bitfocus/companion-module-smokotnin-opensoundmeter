const  Regex = require('@companion-module/base')

module.exports = [
	{
		id: 'important-line',
		type: 'static-text',
		label: ' ',
		value: `This module will listen to data coming from Open Sound Meter (OSM) and make it available in Companion.<br><br>
		Open Sound Meter uses multicast UDP to share data, so you need to make sure that your network is configured to allow this.<br><br>
		This multicast stream is normally hardcoded in OSM to udp://239.255.42.42:49007`,
		width: 12,
	},
	{
		type: 'textinput',
		id: 'host',
		label: 'Multicast IP (default 239.255.42.42)',
		width: 8,
		//regex: REGEX_IP_OR_HOST,
        default: '239.255.42.42',
	},
	{
		type: 'textinput',
		id: 'port',
		label: 'Multicast port (default 49007)',
		width: 4,
		default: 49007,
		regex: Regex.PORT,
	},
	{
		type: 'textinput',
		id: 'updateinterval',
		label: 'Update interval in ms (default 1000)',
		width: 4,
		default: 1000,
		type: 'number',
		min: 100,
		max: 10000,
	},
	{
		id: 'important-line-2',
		type: 'static-text',
		label: ' ',
		value: `OSM will send multiple updates every second, and there's a chance that acting on every single one would use too many resources. 
		To avoid this, the module will only update it's internal variables at a fixed, slower rate.<br><br>
		This would typically be around once per second, but you can adjust this here if necessary.<br><br>
		<em>Note: This will not affect peak value detection - this is checked every time new level data is received.</em>`,
		width: 12,
	},
]