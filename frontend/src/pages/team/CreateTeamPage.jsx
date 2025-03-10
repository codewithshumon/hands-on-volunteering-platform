import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTeamForm } from "./CreateTeamForm";

export const CreateTeamPage = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  const handleSubmit = (formData) => {
    const newTeam = {
      id: Date.now(),
      points: 0,
      members: [],
      events: [],
      achievements: [],
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    setTeams([...teams, newTeam]);
    navigate(`/teams/${newTeam.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <CreateTeamForm onSubmit={handleSubmit} />
    </div>
  );
};
