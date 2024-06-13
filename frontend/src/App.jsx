import Home from "./pages/Home";



const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/discover" element={<TournamentList/>} />
        <Route path="/mes-tournois" element={<TournamentDetail/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
