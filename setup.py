from setuptools import setup, find_packages

setup(
    name='bank_transaction_extension',
    version='0.0.1',
    author='Talha Ahmad',
    author_email='realtalhaa@gmail.com',
    description='Helper for automating Journal Entries from Bank Transactions in Frappe',
    long_description='Helper app to auto-create Journal Entries and update Payment Entries from Bank Transactions',
    long_description_content_type='text/markdown',
    url='https://github.com/AhzeeTech/bank_transaction_extension',
    license='MIT',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=[
        'frappe',
    ],
)
