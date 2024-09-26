import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, Code, BookOpen, Layout, Menu, Pencil } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => (
  <div className="w-64 bg-gray-100 h-screen p-4">
    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
    <nav>
      <ul className="space-y-2">
        {['Projects', 'Tech Stacks', 'Blog Posts'].map((section) => (
          <li key={section}>
            <Button
              variant={activeSection === section ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveSection(section)}
            >
              {section === 'Projects' && <Layout className="mr-2 h-4 w-4" />}
              {section === 'Tech Stacks' && <Code className="mr-2 h-4 w-4" />}
              {section === 'Blog Posts' && <BookOpen className="mr-2 h-4 w-4" />}
              {section}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const ItemModal = ({ isOpen, onClose, onSave, item, type }) => {
  const [name, setName] = useState(item?.name || item?.title || '');
  const [description, setDescription] = useState(item?.description || '');

  const handleSave = () => {
    onSave({ id: item?.id, name: type === 'Blog Posts' ? name : name, title: type === 'Blog Posts' ? name : undefined, description });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? Edit ${type.slice(0, -1)} : Add New ${type.slice(0, -1)}}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="name"
            placeholder={type === 'Blog Posts' ? "Title" : "Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Projects');
  const [projects, setProjects] = useState([
    { id: 1, name: 'Personal Website', description: 'My portfolio website' },
    { id: 2, name: 'Task Manager App', description: 'A React-based task management application' },
  ]);
  const [techStacks, setTechStacks] = useState([
    { id: 1, name: 'React', description: 'Frontend JavaScript library' },
    { id: 2, name: 'Node.js', description: 'JavaScript runtime for backend development' },
  ]);
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'Getting Started with React', description: 'A beginner\'s guide to React' },
    { id: 2, title: 'Best Practices in Web Development', description: 'Tips for clean and efficient coding' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleAddNew = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (item) => {
    const updateState = (prevState) => {
      if (item.id) {
        return prevState.map((i) => (i.id === item.id ? item : i));
      } else {
        return [...prevState, { ...item, id: Date.now() }];
      }
    };

    switch (activeSection) {
      case 'Projects':
        setProjects(updateState);
        break;
      case 'Tech Stacks':
        setTechStacks(updateState);
        break;
      case 'Blog Posts':
        setBlogPosts(updateState);
        break;
    }
  };

  const renderContent = () => {
    let items, setItems;
    switch (activeSection) {
      case 'Projects':
        items = projects;
        setItems = setProjects;
        break;
      case 'Tech Stacks':
        items = techStacks;
        setItems = setTechStacks;
        break;
      case 'Blog Posts':
        items = blogPosts;
        setItems = setBlogPosts;
        break;
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>{activeSection}</CardTitle>
          <CardDescription>Manage your {activeSection.toLowerCase()} here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{item.name || item.title}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            ))}
            <Button className="w-full" onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New {activeSection.slice(0, -1)}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{activeSection}</h2>
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        {renderContent()}
      </div>
      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        item={currentItem}
        type={activeSection}
      />
    </div>
  );
};

export default Dashboard;