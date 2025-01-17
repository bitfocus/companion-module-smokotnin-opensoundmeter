/* eslint-disable prettier/prettier */
module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'a_fast', name: 'A fast' },
		{ variableId: 'a_fast_peak', name: 'A fast peak' },
		{ variableId: 'a_fast_minimum', name: 'A fast minimum' },
		{ variableId: 'a_slow', name: 'A slow' },
		{ variableId: 'a_slow_peak', name: 'A slow peak' },
		{ variableId: 'a_slow_minimum', name: 'A slow minimum' },

		{ variableId: 'b_fast', name: 'B fast' },
		{ variableId: 'b_fast_peak', name: 'B fast peak' },
		{ variableId: 'b_fast_minimum', name: 'B fast minimum' },
		{ variableId: 'b_slow', name: 'B slow' },
		{ variableId: 'b_slow_peak', name: 'B slow peak' },
		{ variableId: 'b_slow_minimum', name: 'B slow minimum' },

		{ variableId: 'z_fast', name: 'Z fast' },
		{ variableId: 'z_fast_peak', name: 'Z fast peak' },
		{ variableId: 'z_fast_minimum', name: 'Z fast minimum' },
		{ variableId: 'z_slow', name: 'Z slow' },
		{ variableId: 'z_slow_peak', name: 'Z slow peak' },
		{ variableId: 'z_slow_minimum', name: 'Z slow minimum' },

	])
}
