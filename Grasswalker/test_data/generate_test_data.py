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

write_file('data_set0.csv',100,100)
write_file('data_set1.csv',100,100)
write_file('data_set2.csv',100,100)
write_file('data_set3.csv',100,100)
write_file('data_set4.csv',100,100)
write_file('data_set5.csv',100,100)
write_file('data_set6.csv',100,100)
write_file('data_set7.csv',100,100)
write_file('data_set8.csv',100,100)
write_file('data_set9.csv',100,100)
write_file('data_set10.csv',100,100)
