function neutralizeIP(ip: string){
    if(ip.startsWith('::ffff:')){
        return ip.replace('::ffff:', '')
    }else{
        return ip
    }
}

export default{
    neutralizeIP
}