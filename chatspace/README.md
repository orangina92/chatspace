# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null: false, unique: true|
|mail|string|null: false,unique: true|

### Association
- has_many :groups,through: members
- has_many :messages
- has_many :members

## groopsテーブル

|Column|Type|Options|
|------|----|-------|
|groop_name|string|index: true,null: false|

### Association
- has_many :users,through: members
- has_many :messages
- has_many :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integral|null: false, foreign_key: true|
|group_id|integral|null: false, foreign_key: true|
|body|text|null: false|
|image|string|null: true|

### Association
- belongs_to :user
- belongs_to :groop