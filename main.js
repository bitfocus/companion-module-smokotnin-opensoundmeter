const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const variableDefaults = require('./variable-defaults')
const UpdatePresetDefinitions = require('./presets')
const ConfigFields = require('./config')
var dgram = require('dgram');

class OsmControllerInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.doUpdate = this.doUpdate.bind(this);
		this.handleMessage = this.handleMessage.bind(this);
		this.levels = {
			a_fast: 0,
			a_fast_peak: -999,
			a_fast_minimum: 0,
			a_slow: 0,
			a_slow_peak: -999,
			a_slow_minimum: 0,
			b_fast: 0,
			b_fast_peak: -999,
			b_fast_minimum: 0,
			b_slow: 0,
			b_slow_peak: -999,
			b_slow_minimum: 0,
			z_fast: 0,
			z_fast_peak: -999,
			z_fast_minimum: 0,
			z_slow: 0,
			z_slow_peak: -999,
			z_slow_minimum: 0,
		}
	}

	async init(config) {
		this.config = config
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions()
		this.setVariableValues(variableDefaults)
		this.updatePresetDefinitions()
		this.updateStatus(InstanceStatus.Connecting, `Connecting to port ${this.config.port}...`)

		//We're only going to update the variables every second
		this.ticker = setInterval(this.doUpdate, 1000);
		this.initUdp();
	
	}

	startTicker() {
		this.ticker = setInterval(this.doUpdate, this.config.updateinterval);
	}

	initUdp() {
		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}
		
		this.socket = dgram.createSocket({ type: 'udp4', reuseAddr: true })

		this.socket.on('listening',()=> {
			var address = this.socket.address();
			console.log('debug', 'UDP Client listening on ' + address.address + ":" + address.port);
			this.socket.setBroadcast(true)
			this.socket.setMulticastTTL(128);
			console.log('debug', 'UDP Client subscribing to multicast stream at ' + this.config.host + ":" + this.config.port);
			this.socket.addMembership(this.config.host);
			this.updateStatus(InstanceStatus.Ok)
		});

		this.socket.on('message', this.handleMessage);

		this.socket.on('error', (err) => {
			this.updateStatus(InstanceStatus.Error, 'Socket error:\n${err.stack}')
			this.socket.close();
		});

		this.socket.bind(this.config.port);
	}

	// When module gets deleted
	async destroy() {
		this.socket.close();
		clearInterval(this.ticker);
	}

	async configUpdated(config) {
		this.config = config
		this.initUdp();
	}

	// Return config fields for web config
	getConfigFields() {
		return ConfigFields
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	handleMessage(message, remote) {
		try {
			var msgObj = JSON.parse(message);
			if (msgObj.api != 'Open Sound Meter') { return; }
			if (msgObj.message != 'levels') { return; }
			if (msgObj.data == null) { return; }

			this.levels = {
				a_fast: msgObj.data.A.Fast.toFixed(2),
				a_fast_peak: msgObj.data.A.Fast > this.levels.a_fast_peak ? msgObj.data.A.Fast.toFixed(2) : this.levels.a_fast_peak,
				a_fast_minimum: msgObj.data.A.Fast < this.levels.a_fast_minimum ? msgObj.data.A.Fast.toFixed(2) : this.levels.a_fast_minimum,
				a_slow: msgObj.data.A.Slow.toFixed(2),
				a_slow_peak: msgObj.data.A.Slow > this.levels.a_slow_peak ? msgObj.data.A.Slow.toFixed(2) : this.levels.a_slow_peak,
				a_slow_minimum: msgObj.data.A.Slow < this.levels.a_slow_minimum ? msgObj.data.A.Slow.toFixed(2) : this.levels.a_slow_minimum,
				b_fast: msgObj.data.B.Fast.toFixed(2),
				b_fast_peak: msgObj.data.B.Fast > this.levels.b_fast_peak ? msgObj.data.B.Fast.toFixed(2) : this.levels.b_fast_peak,
				b_fast_minimum: msgObj.data.B.Fast < this.levels.b_fast_minimum ? msgObj.data.B.Fast.toFixed(2) : this.levels.b_fast_minimum,
				b_slow: msgObj.data.B.Slow.toFixed(2),
				b_slow_peak: msgObj.data.B.Slow > this.levels.b_slow_peak ? msgObj.data.B.Slow.toFixed(2) : this.levels.b_slow_peak,
				b_slow_minimum: msgObj.data.B.Slow < this.levels.b_slow_minimum ? msgObj.data.B.Slow.toFixed(2) : this.levels.b_slow_minimum,
				z_fast: msgObj.data.Z.Fast.toFixed(2),
				z_fast_peak: msgObj.data.Z.Fast > this.levels.z_fast_peak ? msgObj.data.Z.Fast.toFixed(2) : this.levels.z_fast_peak,
				z_fast_minimum: msgObj.data.Z.Fast < this.levels.z_fast_minimum ? msgObj.data.Z.Fast.toFixed(2) : this.levels.z_fast_minimum,
				z_slow: msgObj.data.Z.Slow.toFixed(2),
				z_slow_peak: msgObj.data.Z.Slow > this.levels.z_slow_peak ? msgObj.data.Z.Slow.toFixed(2) : this.levels.z_slow_peak,
				z_slow_minimum: msgObj.data.Z.Slow < this.levels.z_slow_minimum ? msgObj.data.Z.Slow.toFixed(2) : this.levels.z_slow_minimum
			};
		} catch (e) {
			this.log('error', 'Error parsing JSON message: ' + e);
		}
	}

	doUpdate() {
		this.setVariableValues(this.levels);
	}
	updatePresetDefinitions() {
		UpdatePresetDefinitions(this)
	}

}

runEntrypoint(OsmControllerInstance, UpgradeScripts)
