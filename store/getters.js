const getters = {
  domain: state => state.app.domain,
  token: state => state['user'].token,
  avatar: state => state['user'].avatar,
  name: state => state['user'].name,
  introduction: state => state['user'].introduction,
  roles: state => state['user'].roles,
  userid: state => state['hmoe'].userid,
  targetId: state => state['hmoe'].targetId,
  userSig: state => state['hmoe'].userSig,
}
export default getters
