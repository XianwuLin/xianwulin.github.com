#encoding=utf8
mrna_set = set()
mmu_set = set()
link = set()
flag1 = 0
flag2 = 0
with open('data/data.txt') as f:
    for line in f.readlines():
        items = line.strip().split()
        if items[2] == "miRNA":
            mmu_set.add(items[0])
            flag1 = "miRNA"
        if items[2] == "mRNA":
            mrna_set.add(items[0])
            flag1 = "mRNA"
        if items[3] == "miRNA":
            mmu_set.add(items[1])
            flag2 = "miRNA"
        if items[3] == "mRNA":
            mrna_set.add(items[1])
            flag2 = "mRNA"
        link.add((items[0], items[1], flag1, flag2))
with open('js/data.js', 'w') as f:
    f.write("var insertdata = [")
    for i in mrna_set:
        f.write("{data:{id:'%s',category:'%s'}}," % (i, "mRNA") + "\n")
    for i in mmu_set:
        f.write("{data:{id:'%s',category:'%s'}}," % (i, "miRNA") + "\n")
    for i in link:
        data0, data1, flag1, flag2 = i
        if flag1 == "mRNA" and flag2 == "mRNA":
            f.write("{data:{id:'%s%s',source:'%s',target:'%s',category:%d}}," % (data0, data1, data0, data1, 3) + "\n")
        if (flag1 == "mRNA" and flag2 == "miRNA") or (flag1 == "miRNA" and flag2 == "mRNA") :
            f.write("{data:{id:'%s%s',source:'%s',target:'%s',category:%d}}," % (data0, data1, data0, data1, 2) + "\n")
        if (flag1 == "mRNA" and flag2 == "lncRNA") or (flag1 == "lncRNA" and flag2 == "mRNA") :
            f.write("{data:{id:'%s%s',source:'%s',target:'%s',category:%d}}," % (data0, data1, data0, data1, 1) + "\n")
    f.write("];")

print "finish"