/*
 * Configuração do Controle de Relatórios
 * ---------------------------------------
 * 1) Cole abaixo os dados do seu app Web do Firebase
 *    (Console do Firebase > Configurações do projeto > Seus apps > SDK setup and configuration > Config).
 *    Esses dados identificam o projeto e não são senhas: a proteção dos registros
 *    é feita pelo login e pelas regras do Firestore (arquivo firestore.rules).
 */
window.CR_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCgw-1ygz32IQuDfoakYepQjqXcTpfkizU",
  authDomain: "controle-de-relatorios---scpd.firebaseapp.com",
  projectId: "controle-de-relatorios---scpd",
  storageBucket: "controle-de-relatorios---scpd.firebasestorage.app",
  messagingSenderId: "833324332835",
  appId: "1:833324332835:web:b11acbf43d71d7dd34fe96"
};

/*
 * 2) Nome sugerido para o primeiro administrador na configuração inicial.
 *    Os demais perfis são incluídos pelo administrador na tela "Equipe" do sistema.
 */
window.CR_USUARIOS = {
  "joao.coren.melo@gmail.com": "Maria Giovanna"
};

/*
 * 3) Segurança da sessão.
 *    lembrarLogin: false  -> é preciso entrar de novo sempre que a aba ou o navegador for fechado (recomendado).
 *    minutosInatividade   -> o sistema sai sozinho depois desse tempo sem uso.
 */
window.CR_SEGURANCA = {
  lembrarLogin: false,
  minutosInatividade: 30
};
