export default store => next => action =>{
	if(!action.payload || !action.payload.then){
		console.log('No promise found');
		return next(action);
	}

	console.log('Found a promise');
	action.payload.then(resp => {
		const newAction = {...action, payload: resp};

		store.dispatch(newAction);
	});
	console.log("The promise is: ",action.payload);
	return action.payload;  
}