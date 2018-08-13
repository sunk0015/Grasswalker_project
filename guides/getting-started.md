# Graswalker Quick-Start
This is a brief "how-to" guide targeted for Lab users to use Grasswalker's functionality. 
Note: Lab admins have access to all functionality described below in addition to those specified in <admin_guide>.

## High Level Overview
* Grasswalker at its core is an academic data sharing resource that allows independent labs to 
    1. Organize and structure lab research data.  
    2. Potentially share their data with other labs in the Grasswalker network.
* Labs are the highest level of organization in the Grasswalker network. Each Lab contains:
    1. Lab admin, who is the owner lab and has access to the admin console and the main user interace. Has some elevated priviliges discussed in detail in the admin guide.
    2. Users, who are members of their owning lab. They have access to Grasswalker through the main user interface.
    3. Folders, which are the base units of organizations. Folders may be nested in other folders. Top level folders are referred to as Projects.
    4. Datasets, which contain the actual data to be stored. Datasets must be in a folder.
    5. Templates, which can be created and linked to datasets to ensure that the dataset is appropriately annotated.
    
## Login
Assuming an account has been created for you. You may login to Grasswalker by simply clicking Login from the right hand side dropdown menu and entering credentials in the login form.
![Login image](/guides/pics/Login.png)
Note: A success notification will pop up if login successful and navigate to Lab home page. Otherwise a failure notification will popup and redirect to login.

## Folders
In Grasswalker, Folders are the top level unit of organization. A folder may contain various datasets or subfolders. Subfolders are linked to their parents via a "parent" relationship. Top level folders (i.e. folders with no parents) are called projects.
Note that Folders are owned by the lab and not individual users.
![Project Home](/guides/pics/Folder_Home.png)

### Create Folder
To create a Folder simply click the link and enter a name and description.
![Create Folder](/guides/pics/Create_Folder.png)

### Delete Folder
To delete a Folder, hit delete and select the folder to delete. (Note that all subfolders and datasets contained in the folder will be deleted.)

### Explore Folder
To explore the contents of a Folder, simply click the Link at the bottom of Folder icon. This will take you to the folder home. Here you will have more options to create folders, datasets and/or delete contents.

## Datasets
Datasets are the base units that represent actual research data. Datasets contain some meta data and the corresponding file (any type permissible .csv, .doc, etc).
Like folders, datasets are owned by the lab and not individual users. To ensure consistent annotation of datasets, Grasswalker offers flexible custom methodology templates
discussed in the next section.

### Create Dataset
Creating a dataset entails uploading a file and populating some meta data. 
By default every dataset requires a title and an abstract and a raw file to be uploaded. 
The Methodology can either be input raw from the Methodology field or specified by a premade template.
![Create Dataset without Tempalte](/guides/pics/Create_Dataset_NoTemplate.png)


### Delete Dataset
To delete a dataset, simply hit delete and choose the appropriate dataset.

### Explore Dataset
To explore the contents of a dataset, hit explore. Note that the detail view page for datasets contains a download option. 

## Templates
Templates in Grasswalker are basically key value pairs for common meta deta fields. They can be used to populate metadata that is common to a particular type of dataset.

### Create Templates
![Create Template](/guides/pics/Create_Template.png)
A template can be created as seen above by providing mandatory fields and default values (placeholders can be given as ***).

After saving the template. Subsequent dataset creations can use the template to populat fields.
![Create Dataset Template](/guides/pics/Create_Dataset_Template.png)
