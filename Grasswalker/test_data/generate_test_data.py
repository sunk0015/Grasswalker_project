import numpy as np

def generate(n,m):
    a = [[0 for i in range(m)]for j in range(n)]
    for i in range(n):
        for j in range(m):
            a[i][j]=np.random.normal(i)
    return a

def write_file(file_name,n,m):
    data_set = generate(n,m)
    np.savetxt(file_name, data_set, delimiter=",")


def write_datasets(dir,folder_list,num_datasets,size):
    counter=0
    for folder in folder_list:
        for i in range(num_datasets):
            file_name = dir+folder+'_D'+str(counter)+'.csv'
            write_file(file_name,size,size)
            counter+=1
        counter = 0

path = '/Users/Sai/Documents/proj/Grasswalker_project/Grasswalker/test_data/'
folder_list = ['MIDF1','MICF1','WIBF2','WIBF1','MNAF3','MNAF2','MNAF1']
write_datasets(path,folder_list,7,10)