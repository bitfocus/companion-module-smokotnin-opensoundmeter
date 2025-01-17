module.exports = function (self) {
	self.setActionDefinitions({
		reset_peaks: {
			name: 'Reset peak levels',
			options: [],
			callback: async (_event) => {
				self.log('info', 'Resetting peak levels');
				self.levels.a_fast_peak= -999;
				self.levels.a_slow_peak= -999;
				self.levels.b_fast_peak= -999;
				self.levels.b_slow_peak= -999;
				self.levels.z_fast_peak= -999;
				self.levels.z_slow_peak= -999;
				self.setVariableValues(self.levels);
			},
		},
		reset_minimums: {
			name: 'Reset minimum levels',
			options: [],
			callback: async (_event) => {
				self.log('info', 'Resetting minimum levels');
				self.levels.a_fast_minimum= 0;
				self.levels.a_slow_minimum= 0;
				self.levels.b_fast_minimum= 0;
				self.levels.b_slow_minimum= 0;
				self.levels.z_fast_minimum= 0;
				self.levels.z_slow_minimum= 0;
				self.setVariableValues(self.levels);
			},
		},
	})
}
