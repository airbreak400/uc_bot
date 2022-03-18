export default (ctx, next) => {
    if(ctx.session.timer === undefined) {
        ctx.session.timer = new Date();
        next();
    } else {
        const prevTime = new Date(ctx.session.timer);
        const thisTime = new Date();
        const diffInSec = ((thisTime.getTime() - prevTime.getTime()) / 1000).toFixed(0);
        
        if(diffInSec > 4) {
            ctx.session.timer = new Date();
            next();        
        } else {
            ctx.session.timer = new Date();
        }
    }
}