import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";

const HomePage = ({ data }) => {
  return (
    <div>
      <Filter />
      <NoteCardContainer notes={data} />
    </div>
  );
};

export default HomePage;
