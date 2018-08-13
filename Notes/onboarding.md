Steps to onboarding a new lab
1. Create an instance of the Lab in the backend using the admin interface
    - part a: Create a "User" object corresponding to the administrator of the lab who will have root access to lab data
    - part b: Create a "Lab" object for the corresponding lab
    - part c: Make sure to link the created lab from b to the user created in a in the user profile section of the User instance in the admin
    
2. Allocate permissions
    - From the admin console give the newly created User the add, update, delete permissions
    for the different models in the datasets module (i.e. add dataset, update dataset, delete dataset, add folder, update folder, delete folder, add template, update template, delete template, add user, update user, delete user)
    - DO NOT GIVE ANY PERMISSIONS for adding, updating or deleting Labs
    - Note that all of the datasets, folders and users associated to this lab are sandboxed by the lab (meaning that no lab admin can create a user in a different lab or delete a folder in another lab etc)
     
3. Pass the credentials of the created lab admin User to the person one time (after this they should reset their password). 

4. Allow/Instruct them to create Users, Folders, Templates, Datasets as needed