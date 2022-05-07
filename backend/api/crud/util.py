def add_db(db, obj):
    db.add(obj)
    db.commit()
    db.refresh(obj)