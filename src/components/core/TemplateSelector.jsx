import PropTypes from "prop-types";

const TemplateSelector = ({
  selectedTemplate,
  onTemplateChange,
  onApplyTemplate,
  selectedTheme,
  onThemeChange,
}) => {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      thumbnail: "/thumbnails/modern.png",
    },
    {
      id: "classic",
      name: "Classic",
      thumbnail: "/thumbnails/classic.png",
    },
    {
      id: "minimal",
      name: "Minimal",
      thumbnail: "/thumbnails/minimal.png",
    },
  ];

  const themes = [
    { id: "light", name: "Light" },
    { id: "dark", name: "Dark" },
    { id: "vibrant", name: "Vibrant" },
  ];

  return (
    <div className="mb-6">
      {/* Template Section */}
      <div>
        <label
          className="block text-lg font-semibold mb-2"
          htmlFor="template-selector"
        >
          Select Template
        </label>
        <div
          id="template-selector"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          role="group"
          aria-labelledby="template-selector"
        >
          {templates.map((template) => (
            <div
              key={template.id}
              className={`p-4 border rounded-md shadow-sm transition-transform transform hover:scale-105 ${
                selectedTemplate === template.id
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
            >
              <img
                src={template.thumbnail}
                alt={`${template.name} Thumbnail`}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="text-md font-medium text-center mb-2">
                {template.name}
              </h3>
              <div className="flex justify-between">
                <button
                  onClick={() => onTemplateChange(template.id)}
                  className={`px-3 py-2 rounded ${
                    selectedTemplate === template.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  aria-pressed={selectedTemplate === template.id}
                  aria-label={`Preview ${template.name} template`}
                >
                  Preview
                </button>
                <button
                  onClick={() => onApplyTemplate(template.id)}
                  className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Section */}
      <div>
        <label
          className="block text-lg font-semibold mt-6 mb-2"
          htmlFor="theme-selector"
        >
          Select Theme
        </label>
        <select
          id="theme-selector"
          value={selectedTheme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
          aria-label="Select a theme for the resume"
        >
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

TemplateSelector.propTypes = {
  selectedTemplate: PropTypes.string.isRequired,
  onTemplateChange: PropTypes.func.isRequired,
  onApplyTemplate: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

export default TemplateSelector;
