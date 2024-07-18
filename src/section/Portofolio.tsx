import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormPopup from '../assets/component/FormPopup';
import Alert from '../assets/component/Alert';

interface Skill {
  id: number;
  title: string;
  image_path: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image_path: string;
}

type EditingItem = (Skill | Project) & { type: 'skill' | 'project' };

interface PortofolioProps {
  isLoggedIn: boolean;
  onLogin: (isLoggedIn: boolean) => void;
}

type AlertType = 'success' | 'error';
interface AlertState {
  show: boolean;
  message: string;
  type: AlertType;
}

function Portofolio({ isLoggedIn, onLogin }: PortofolioProps) {
  const [isSkillPopupOpen, setIsSkillPopupOpen] = useState(false);
  const [isProjectPopupOpen, setIsProjectPopupOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [alert, setAlert] = useState<AlertState>({ show: false, message: '', type: 'success' });
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ show: boolean; item: EditingItem | null }>({ show: false, item: null });

  useEffect(() => {
    fetchSkills();
    fetchProjects();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get<Skill[]>('http://localhost:3001/api/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>('http://localhost:3001/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAddSkill = async (title: string, description: string, image: File | null) => {
    try {
      if (!image) {
        throw new Error('No image selected');
      }
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image);

      await axios.post('http://localhost:3001/api/skills', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAlert({ show: true, message: 'Skill added successfully', type: 'success' });
      fetchSkills();
    } catch (error) {
      console.error('Error adding skill:', error);
      setAlert({ show: true, message: 'Error adding skill', type: 'error' });
    }
  };

  const handleAddProject = async (title: string, description: string, image: File | null) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) formData.append('image', image);
  
      await axios.post('http://localhost:3001/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      setAlert({ show: true, message: 'Project added successfully', type: 'success' });
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      setAlert({ show: true, message: 'Error adding project', type: 'error' });
    }
  };

  const handleEditSkill = async (id: number, title: string, description: string, image: File | null) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      if (image) formData.append('image', image);

      await axios.put(`http://localhost:3001/api/skills/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAlert({ show: true, message: 'Skill updated successfully', type: 'success' });
      fetchSkills();
    } catch (error) {
      console.error('Error updating skill:', error);
      setAlert({ show: true, message: 'Error updating skill', type: 'error' });
    }
  };

  const handleEditProject = async (id: number, title: string, description: string, image: File | null) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) formData.append('image', image);

      await axios.put(`http://localhost:3001/api/projects/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAlert({ show: true, message: 'Project updated successfully', type: 'success' });
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      setAlert({ show: true, message: 'Error updating project', type: 'error' });
    }
  };

  const handleDeleteConfirmation = (item: EditingItem) => {
    setDeleteConfirmation({ show: true, item });
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/skills/${id}`);
      setAlert({ show: true, message: 'Skill deleted successfully', type: 'success' });
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
      setAlert({ show: true, message: 'Error deleting skill', type: 'error' });
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/projects/${id}`);
      setAlert({ show: true, message: 'Project deleted successfully', type: 'success' });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      setAlert({ show: true, message: 'Error deleting project', type: 'error' });
    }
  };

  const SkillItem = ({ skill }: { skill: Skill }) => (
    <div className="relative group w-24 h-24 bg-gray-800 border-t-2 border-teal-700 rounded-lg overflow-hidden">
      <img src={`http://localhost:3001/${skill.image_path}`} alt={skill.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
        <p className="text-white text-md text-center mb-1">{skill.title}</p>
        {isLoggedIn && (
          <div className="absolute bottom-2 right-2 flex">
            <button onClick={() => setEditingItem({ type: 'skill', ...skill } as EditingItem)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"><i className="ph-pencil text-md"></i></button>
            <button onClick={() => handleDeleteConfirmation({ type: 'skill', ...skill } as EditingItem)} className="bg-red-500 text-white px-2 py-1 rounded text-xs"><i className="ph-trash text-md"></i></button>
          </div>
        )}
      </div>
    </div>
  );

  const ProjectItem = ({ project }: { project: Project }) => (
    <div className="relative group w-full h-48 bg-gray-800 rounded-lg border-t-2 border-teal-700 overflow-hidden">
      <img src={`http://localhost:3001/${project.image_path}`} alt={project.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col p-4">
        <p className='text-teal-700 px-4 text-3xl'>{project.title}</p>
        <p className="text-white px-4 text-md">{project.description}</p>
        {isLoggedIn && (
          <div className="absolute bottom-2 right-2 flex">
            <button onClick={() => setEditingItem({ type: 'project', ...project } as EditingItem)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded text-xl"><i className="ph-pencil text-xl"></i></button>
            <button onClick={() => handleDeleteConfirmation({ type: 'project', ...project } as EditingItem)} className="bg-red-500 text-white px-2 py-1 rounded text-xs"><i className="ph-trash text-xl"></i></button>
          </div>
        )}
      </div>
    </div>
  );


  const AddButton = ({ onClick, className }: { onClick: () => void, className: string }) => (
    <button 
      className={`bg-gray-700 rounded-lg border-t-2 border-teal-700 flex items-center justify-center hover:bg-gray-800 ${className}`}
      onClick={onClick}>
      <i className="ph-plus text-2xl"></i>
    </button>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 sm:mb-20">
          <div className="flex items-center mb-6 sm:mb-10">
            <h2 className="text-2xl text-center sm:text-3xl font-bold">SKILL</h2>
          </div>
          <div className="flex flex-wrap gap-4 mb-4 justify-center">
            {skills.map((skill: Skill) => (
              <SkillItem key={skill.id} skill={skill} />
            ))}
            {isLoggedIn && <AddButton onClick={() => setIsSkillPopupOpen(true)} className="w-24 h-24" />}
          </div>
        </div>
        <div>
          <div className="flex items-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">MY PROJECT</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {projects.map((project: Project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
            {isLoggedIn && (projects.length < 3 || projects.length % 3 === 0) && (
              <AddButton onClick={() => setIsProjectPopupOpen(true)} className="w-full h-48" />
            )}
          </div>
        </div>
      </div>
      {isLoggedIn && (
        <>
          <FormPopup 
            isOpen={isSkillPopupOpen} 
            onClose={() => setIsSkillPopupOpen(false)} 
            onSubmit={handleAddSkill}
            title="Add Skill"
            showDescription={false}
          />
          <FormPopup 
            isOpen={isProjectPopupOpen} 
            onClose={() => setIsProjectPopupOpen(false)} 
            onSubmit={handleAddProject}
            title="Add Project"
          />
          {editingItem && (
            <FormPopup 
              isOpen={true}
              onClose={() => setEditingItem(null)}
              onSubmit={(title, description, image) => {
                if (editingItem.type === 'skill') {
                  handleEditSkill(editingItem.id, title, description, image);
                } else {
                  handleEditProject(editingItem.id, title, description, image);
                }
                setEditingItem(null);
              }}
              title={`Edit ${editingItem.type === 'skill' ? 'Skill' : 'Project'}`}
              showDescription={editingItem.type === 'project'}
              initialTitle={editingItem.title}
              initialDescription={editingItem.type === 'project' ? (editingItem as Project).description : ''}
            />
          )}
        </>
      )}
      {alert.show && (
        <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ ...alert, show: false })} />
      )}
    </div>
  );
}

export default Portofolio;