import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUpload, FiYoutube, FiPlus, FiTrash2, FiCheck, FiSave, FiImage } = FiIcons;

function UploadCourse() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    duration: '',
    thumbnail: '',
    lessons: [
      { title: '', videoUrl: '', duration: '', description: '' }
    ]
  });

  const [previewImg, setPreviewImg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...course.lessons];
    updatedLessons[index] = { ...updatedLessons[index], [field]: value };
    setCourse(prev => ({ ...prev, lessons: updatedLessons }));
  };

  const addLesson = () => {
    setCourse(prev => ({
      ...prev,
      lessons: [...prev.lessons, { title: '', videoUrl: '', duration: '', description: '' }]
    }));
  };

  const removeLesson = (index) => {
    const updatedLessons = course.lessons.filter((_, i) => i !== index);
    setCourse(prev => ({ ...prev, lessons: updatedLessons }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    // In a real app, you would handle file upload to a server
    // For this demo, we'll just set a preview
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImg(e.target.result);
          setCourse(prev => ({ ...prev, thumbnail: 'thumbnail.jpg' }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImg(e.target.result);
        setCourse(prev => ({ ...prev, thumbnail: 'thumbnail.jpg' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course data:', course);
    
    // Simulate API call
    setTimeout(() => {
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1000);
  };

  const validateYoutubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload New Course</h1>
        <p className="text-gray-600">Create and publish a new automation course with YouTube video lessons</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title*
              </label>
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleChange}
                required
                placeholder="e.g., Python Automation Masterclass"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description*
              </label>
              <textarea
                name="description"
                value={course.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Provide a detailed description of what students will learn in this course"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category*
                </label>
                <select
                  name="category"
                  value={course.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Programming">Programming</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Testing">Testing</option>
                  <option value="Data Collection">Data Collection</option>
                  <option value="Database">Database</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level*
                </label>
                <select
                  name="level"
                  value={course.level}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration*
                </label>
                <input
                  type="text"
                  name="duration"
                  value={course.duration}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 4 weeks"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Thumbnail*
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                  isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!previewImg ? (
                  <div className="text-center">
                    <SafeIcon icon={FiImage} className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 mb-2">Drag and drop an image here, or click to select</p>
                    <p className="text-xs text-gray-500 mb-4">PNG, JPG or GIF up to 2MB</p>
                    <label className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors cursor-pointer">
                      <span>Select Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={previewImg} 
                      alt="Course thumbnail preview" 
                      className="h-48 mx-auto object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImg('');
                        setCourse(prev => ({ ...prev, thumbnail: '' }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Course Lessons</h2>
              <button
                type="button"
                onClick={addLesson}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="h-5 w-5" />
                <span>Add Lesson</span>
              </button>
            </div>

            <div className="space-y-6">
              {course.lessons.map((lesson, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Lesson {index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeLesson(index)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <SafeIcon icon={FiTrash2} className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lesson Title*
                      </label>
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                        required
                        placeholder="e.g., Introduction to Python Automation"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        YouTube Video URL*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiYoutube} className="h-5 w-5 text-red-500" />
                        </div>
                        <input
                          type="url"
                          value={lesson.videoUrl}
                          onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)}
                          required
                          placeholder="https://www.youtube.com/watch?v=..."
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                            lesson.videoUrl && !validateYoutubeUrl(lesson.videoUrl)
                              ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-primary-500'
                          }`}
                        />
                      </div>
                      {lesson.videoUrl && !validateYoutubeUrl(lesson.videoUrl) && (
                        <p className="mt-1 text-sm text-red-600">Please enter a valid YouTube URL</p>
                      )}
                    </div>

                    {lesson.videoUrl && validateYoutubeUrl(lesson.videoUrl) && extractYoutubeId(lesson.videoUrl) && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">Video Preview:</p>
                        <div className="aspect-w-16 aspect-h-9">
                          <iframe
                            src={`https://www.youtube.com/embed/${extractYoutubeId(lesson.videoUrl)}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-48 rounded-lg"
                          ></iframe>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lesson Duration*
                        </label>
                        <input
                          type="text"
                          value={lesson.duration}
                          onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
                          required
                          placeholder="e.g., 15 min"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lesson Description
                      </label>
                      <textarea
                        value={lesson.description}
                        onChange={(e) => handleLessonChange(index, 'description', e.target.value)}
                        rows={2}
                        placeholder="Brief description of what this lesson covers"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end items-center space-x-4">
            {uploadSuccess && (
              <div className="flex items-center text-green-600 mr-auto">
                <SafeIcon icon={FiCheck} className="h-5 w-5 mr-2" />
                <span>Course uploaded successfully!</span>
              </div>
            )}
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} className="h-5 w-5" />
              <span>Publish Course</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default UploadCourse;