const { combineRgb } = require('@companion-module/base')

module.exports = function (self) {
	let presets = {
		levelsHeader: {
			category: 'Presets',
			name: 'Levels',
			type: 'text',
			text: 'View live sound level data',
		},
		a_slow: {
			type: 'button',
			category: 'Presets',
			name: `dBfs A slow`,
			style: {
				text: `dBfs A slow\nLive: $(Open_Sound_Meter:a_slow)\nMin: $(Open_Sound_Meter:a_slow_minimum)\nPeak: $(Open_Sound_Meter:a_slow_peak)`,
				size: '10',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [],
			feedbacks: [],
		},
		a_fast: {
			type: 'button',
			category: 'Presets',
			name: `dBfs A fast`,
			style: {
				text: `dBfs A fast\nLive: $(Open_Sound_Meter:a_fast)\nMin: $(Open_Sound_Meter:a_fast_minimum)\nPeak: $(Open_Sound_Meter:a_fast_peak)`,
				size: '10',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [],
			feedbacks: [],
		},
		b_slow: {
			type: 'button',
			category: 'Presets',
			name: `dBfs B slow`,
			style: {
				text: `dBfs B slow\nLive: $(Open_Sound_Meter:b_slow)\nMin: $(Open_Sound_Meter:b_slow_minimum)\nPeak: $(Open_Sound_Meter:b_slow_peak)`,
				size: '10',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [],
			feedbacks: [],
		},
		b_fast: {
			type: 'button',
			category: 'Presets',
			name: `dBfs B fast`,
			style: {
				text: `dBfs B fast\nLive: $(Open_Sound_Meter:b_fast)\nMin: $(Open_Sound_Meter:b_fast_minimum)\nPeak: $(Open_Sound_Meter:b_fast_peak)`,
				size: '10',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [],
			feedbacks: [],
		},
		z_slow: {
			type: 'button',
			category: 'Presets',
			name: `dBfs Z slow`,
			style: {
				text: `dBfs Z slow\nLive: $(Open_Sound_Meter:z_slow)\nMin: $(Open_Sound_Meter:z_slow_minimum)\nPeak: $(Open_Sound_Meter:z_slow_peak)`,
				size: '10',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [],
			feedbacks: [],
		},
		z_fast: {
			type: 'button',
			category: 'Presets',
			name: `dBfs Z fast`,
			style: {
				text: `dBfs Z fast\nLive: $(Open_Sound_Meter:z_fast)\nMin: $(Open_Sound_Meter:z_fast_minimum)\nPeak: $(Open_Sound_Meter:z_fast_peak)`,
				size: '10',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [],
			feedbacks: [],
		},
		resetHeader: {
			category: 'Presets',
			name: 'Reset',
			type: 'text',
			text: 'Reset peak and minimum levels',
		},
		reset_peaks: {
			type: 'button',
			category: 'Presets',
			name: 'Reset peak levels',
			style: {
				text: 'Reset peak levels',
				size: '15',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{ down: [{ actionId: 'reset_peaks', options: {  } }], up: [] }],
			feedbacks: [],
		},
		reset_minimums: {
			type: 'button',
			category: 'Presets',
			name: 'Reset minimum levels',
			style: {
				text: 'Reset minimum levels',
				size: '15',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{ down: [{ actionId: 'reset_minimums', options: {} }], up: [] }],
			feedbacks: [],
		},
	}
	self.setPresetDefinitions(presets)
}
