export function debounce(fn,delaytime=0){
	let timer=null;
	return function(...args){
		if(timer) clearTimeout(timer);
		timer=setTimeout(() => {
			fn.call(this,args)
		}, delaytime);
	}
}