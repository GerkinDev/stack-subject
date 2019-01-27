export const orderedMockCalls = ( impl?: ( ...args: any[] ) => any ) => {
	const mockFn: jest.Mock & {argsCall: any[][]} = Object.assign(
		jest.fn( ( ...args: any[] ) => {
			mockFn.argsCall.push( args );
			return impl && impl( ...args );
		} ),
		{argsCall: []}
	);
	return mockFn;
};
